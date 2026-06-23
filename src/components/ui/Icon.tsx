interface IconProps {
  name: string
  color?: string
  size?: number
  className?: string
}

/**
 * Ícone PNG via CSS mask — permite tingir com qualquer cor via background-color.
 * Os arquivos ficam em /ui/ic*.png (servidos pelo Vite).
 */
export function Icon({ name, color = '#D4A54A', size = 20, className }: IconProps) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: 'inline-block',
        flexShrink: 0,
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(/ui/${name}.png)`,
        maskImage: `url(/ui/${name}.png)`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
