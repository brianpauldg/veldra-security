import { cn } from '@/lib/utils'

interface MeridianProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Meridian({ size = 'sm', className }: MeridianProps) {
  return (
    <div className={cn(
      'meridian',
      size === 'lg' && 'meridian-lg',
      size === 'md' && 'meridian-md',
      size === 'sm' && 'meridian-sm',
      className
    )}>
      <div className="r" />
      <div className="r r2" />
      <div className="r r3" />
      <div className="core">
        <span className="glyph">B</span>
      </div>
    </div>
  )
}
