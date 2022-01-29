export const evaluateRound = (val: number, isUser: boolean) => isUser ?
  (val < 18 ? 'rounded-full rounded-tr-md' : val < 50 ? 'rounded-full' : 'rounded-2xl rounded-tr-md' ) :

  (val < 18 ? 'rounded-full rounded-tl-sm' : val < 50 ? 'rounded-full' : 'rounded-2xl rounded-tl-md' )
