export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({ ok: false, error: 'SUPABASE_URL 또는 SUPABASE_ANON_KEY 환경변수가 설정되지 않았어요.' });
  }

  try {
    const r = await fetch(`${url}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    return res.status(200).json({
      ok: true,
      supabaseStatus: r.status,
      pingedAt: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
