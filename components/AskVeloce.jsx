'use client'

import { useMutation } from '@tanstack/react-query'
import { useAskStore } from '@/store/askStore'

const SAMPLES = [
  'which rooms had the most AC issues in July?',
  'how many in-house calls did we make yesterday?',
  'what did room 401 complain about this stay?',
]

/**
 * Renders the answer text with **bold** markdown converted to <b>.
 * The mock API returns strings, not JSX, so we do the tiniest parse here.
 */
function renderAnswer(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**')
      ? <b key={i}>{p.slice(2, -2)}</b>
      : <span key={i}>{p}</span>
  )
}

async function fetchAnswer(q) {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ q }),
  })
  if (!res.ok) throw new Error('ask failed')
  return res.json()
}

export default function AskVeloce() {
  const { question, setQuestion, lastAnswer, setAnswer } = useAskStore()

  const mutation = useMutation({
    mutationFn: fetchAnswer,
    onSuccess: (data, q) => setAnswer(q, data),
  })

  const run = () => {
    const q = question.trim()
    if (!q) return
    mutation.mutate(q)
  }

  const setSample = (s) => {
    setQuestion(s)
    mutation.mutate(s)
  }

  const onKey = (e) => {
    if (e.key === 'Enter') run()
  }

  const answer = lastAnswer?.a
  const isLoading = mutation.isPending

  return (
    <div className="try">
      <div className="try-in">
        <span className="lead">Ask Veloce</span>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={onKey}
          placeholder="Try: which rooms had the most AC issues in July?"
        />
        <button className="try-btn" onClick={run} disabled={isLoading}>
          {isLoading ? 'Asking…' : 'Answer'}
        </button>
      </div>
      <div className="try-samples">
        {SAMPLES.map((s) => (
          <span key={s} onClick={() => setSample(s)}>{s}</span>
        ))}
      </div>
      {answer && (
        <div className="try-answer on">
          {renderAnswer(answer.out)}
          <span className="src">{answer.src}</span>
        </div>
      )}
    </div>
  )
}
