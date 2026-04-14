interface SubmitData {
  name: string;
  phone: string;
  plan?: string;
  source: string;
}

export async function submitForm(data: SubmitData): Promise<void> {
  const res = await fetch('/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Submission failed: ${res.status}`);
  }
}
