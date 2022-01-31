import React from 'react';

import { firestore } from "@/lib/firebase"
import { useState, useRef } from 'react'
import { ChatStore, VideoChatStore } from '@/store/.'
import { collection, doc, addDoc, deleteDoc, onSnapshot, getDoc, updateDoc, getDocsFromServer,  } from 'firebase/firestore'

import { useNavigation } from '@/hooks/.'

const servers = {
  iceServers: [
      {
          urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
          ],
      },
  ],
  iceCandidatePoolSize: 10,
};

export const pc = new RTCPeerConnection(servers);

interface useVideoChatResult {
  webcamActive: boolean,
  activeMicro: boolean,
  roomId: string ,
  localRef: React.MutableRefObject<any>,
  remoteRef: React.MutableRefObject<any>,
  setupSources: () => Promise<void>,
  hangUp: () => Promise<void>,
  toggleVideo: () => void
  toggleAudio: () => void
  toggleShareScreen: () => void, 
  sharedScreen: boolean
}

 const useVideoChat: (callId: string, mode: string) => useVideoChatResult = (callId, mode, ) => {

  const pc = new RTCPeerConnection(servers);

  const [webcamActive, setWebcamActive] = useState(false);
  const [activeMicro, setMicroActive] = useState(false)
  const [roomId, setRoomId] = useState(ChatStore.selectedChatId);
  const [sharedScreen, setSharedScreen] = useState(false)

  const localRef = useRef(null);
  const remoteRef = useRef(null);

  const { pushRouter } = useNavigation()

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: true})

    const remoteStream = new MediaStream()

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach(track => (
        remoteStream.addTrack(track)
      ))
    }
    
    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);
    setMicroActive(true)
    
    if (mode === 'create') {

      const callDoc = doc(firestore, 'calls', callId)  
      const offerCandidates = collection(callDoc, 'offerCandidates')
      const answerCandidates = collection(callDoc, 'answerCandidates')

      setRoomId(callDoc.id)

      pc.onicecandidate = async(event) => {
        event.candidate &&
            await addDoc(offerCandidates, event.candidate.toJSON());
      }

      const offerDescription = await pc.createOffer()
      await pc.setLocalDescription(offerDescription)

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await updateDoc(callDoc, {offer})

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(
                data.answer
            );
            pc.setRemoteDescription(answerDescription);
        }
      })

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              const candidate = new RTCIceCandidate(
                  change.doc.data()
              );
              pc.addIceCandidate(candidate);
          }
      });
      })

    } else if (mode === "join") {

      const callDoc = doc(firestore,  'calls', callId)  
      const offerCandidates = collection(callDoc, 'offerCandidates')
      const answerCandidates = collection(callDoc, 'answerCandidates')

      pc.onicecandidate = async (event) => {
        event.candidate &&
          await addDoc(answerCandidates, event.candidate.toJSON());
      };

      const callData = (await getDoc(callDoc)).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, {answer})

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              let data = change.doc.data();
              pc.addIceCandidate(new RTCIceCandidate(data));
          }
      });
      })

    }
    pc.onconnectionstatechange = (event) => {
      if (pc.connectionState === "disconnected") {
          hangUp();
      }
    };

  }

  const toggleShareScreen = async () => {
    if (sharedScreen) {
      setSharedScreen(false)
      await cancelShareSreen()
    } else {
      await startShareScreen()
      setSharedScreen(true)
    }

  }

  const startShareScreen = async () => {
    const localStream = await navigator.mediaDevices.getDisplayMedia({audio: activeMicro, video: true})

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    localRef.current.srcObject = localStream;
  } 

  const cancelShareSreen = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: activeMicro, video: true})

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    localRef.current.srcObject = localStream;
  } 


  const toggleAudio = async () => {
    if (activeMicro) {
      setMicroActive(false)
      await cancelMicro()
    } else {
      await startMicro()
      setMicroActive(true)
    }

  }

  const startMicro = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: true, video: webcamActive})

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    localRef.current.srcObject = localStream;
  }

  const cancelMicro = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: false, video: webcamActive})

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    localRef.current.srcObject = localStream;
  }

  const toggleVideo = async () => {
    if (webcamActive) {
      setWebcamActive(false)
      cancelVideo()
    } else {
      await startVideo()
      setWebcamActive(true)
    }

  }

  const cancelVideo = () => {
    const stream = localRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    })

    localRef.current.srcObject = null;
  }

  const startVideo = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({audio: activeMicro, video: true})

    localStream.getTracks().forEach(track => (
      pc.addTrack(track, localStream)
    ))

    localRef.current.srcObject = localStream;

  }

  const hangUp = async () => {
   
    pc.close()
    if (VideoChatStore.currentVideoChat) {
      const roomRef = doc(firestore, 'calls', VideoChatStore.currentVideoChat) 
    
      const answears = (await getDocsFromServer(collection(roomRef, 'answerCandidates'))).forEach(async document => {
        await deleteDoc(doc(firestore, document.ref.path))
      }) 
      
      const offers = (await getDocsFromServer(collection(roomRef, 'offerCandidates'))).forEach(async document => {
        await deleteDoc(doc(firestore, document.ref.path))
      }) 
  
      await deleteDoc(roomRef)
      window.location.reload()
    }
    pushRouter('/')
  }

  return {webcamActive, roomId, localRef, remoteRef, setupSources, hangUp , toggleVideo, toggleAudio, activeMicro, toggleShareScreen, sharedScreen}
};

export default useVideoChat