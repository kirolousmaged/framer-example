export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { ensureMigrated } = await import('./lib/migrate')
    await ensureMigrated()
  }
}
