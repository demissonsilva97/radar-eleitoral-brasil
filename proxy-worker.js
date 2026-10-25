/**
 * Radar Eleitoral Brasil — proxy CORS opcional, somente leitura.
 * Permite apenas arquivos JSON públicos específicos do TSE e a geometria do mapa.
 * Nenhum dado é alterado, autenticado ou armazenado pelo Worker.
 */
const ALLOWED_UFS = new Set(['br','ac','al','ap','am','ba','ce','df','es','go','ma','mt','ms','mg','pa','pb','pr','pe','pi','rj','rn','rs','ro','rr','sc','se','sp','to']);
const TSE_HOST = 'resultados.tse.jus.br';
const MAP_HOST = 'cdn.jsdelivr.net';
const MAP_PATH = '/gh/henriquemalvar/br-geojson@main/dist/estados.geojson';

export default {
  async fetch(request) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400'
    };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: cors });

    const requestUrl = new URL(request.url);
    const rawTarget = requestUrl.searchParams.get('url');
    if (!rawTarget) return new Response('Missing url parameter', { status: 400, headers: cors });

    let target;
    try { target = new URL(rawTarget); }
    catch { return new Response('Invalid url', { status: 400, headers: cors }); }
    if (target.protocol !== 'https:') return new Response('HTTPS only', { status: 403, headers: cors });

    let allowed = false;
    if (target.hostname === TSE_HOST) {
      const match = target.pathname.match(/^\/oficial\/ele2026\/6258\/dados\/([a-z]{2})\/([a-z]{2})-c0001-e006258-u\.json$/);
      allowed = !!match && match[1] === match[2] && ALLOWED_UFS.has(match[1]);
    } else if (target.hostname === MAP_HOST) {
      allowed = target.pathname === MAP_PATH;
    }
    if (!allowed) return new Response('Upstream URL not allowed', { status: 403, headers: cors });

    try {
      const upstream = await fetch(target.toString(), {
        headers: { 'Accept': 'application/json, application/geo+json' },
        redirect: 'follow'
      });
      const headers = new Headers(cors);
      headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/json; charset=utf-8');
      headers.set('Cache-Control', target.hostname === TSE_HOST ? 'no-store' : 'public, max-age=86400');
      headers.set('X-Content-Type-Options', 'nosniff');
      return new Response(upstream.body, { status: upstream.status, headers });
    } catch {
      return new Response('Upstream fetch failed', { status: 502, headers: cors });
    }
  }
};
