/**
 * Prefixa um caminho de asset em /public com a base configurada no Vite
 * (`base` em vite.config.ts, ex: '/t20-mestre-supremo/' no GitHub Pages).
 * Sem isso, caminhos absolutos como '/ui/x.png' dão 404 sob a base.
 *
 * Uso: asset('ui/canto-tl.png')  ou  asset('/imagens/x.jpeg')
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
