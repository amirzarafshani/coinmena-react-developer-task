import { memo } from 'react';
import { CoinIconProps } from '../../interfaces'

const CoinIcon: React.FC<CoinIconProps> = memo(({ id, className }) => {
  return (
    <img className={className} src={`https://messari.io/asset-images/${id}/32.png?v=2`} />
  )
})

export default CoinIcon;
