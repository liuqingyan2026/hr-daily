// AI摘要生成模块
// 支持多个免费/低成本API

interface SummaryResult {
  success: boolean
  summary: string
  error?: string
}

// 使用硅基流动API（免费额度）
async function generateWithSiliconFlow(text: string, apiKey: string): Promise<SummaryResult> {
  try {
    const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        messages: [
          {
            role: 'system',
            content: '你是一个资讯摘要助手。请为下文生成50字以内的中文摘要，要求简洁、有信息量。'
          },
          {
            role: 'user',
            content: `标题：${text}\n\n请生成50字以内的中文摘要：`
          }
        ],
        max_tokens: 100,
        temperature: 0.3,
      }),
    })
    
    if (!response.ok) {
      throw new Error(`API错误: ${response.status}`)
    }
    
    const data = await response.json()
    const summary = data.choices?.[0]?.message?.content?.trim() || ''
    return { success: true, summary }
  } catch (error) {
    return { success: false, summary: '', error: error instanceof Error ? error.message : '未知错误' }
  }
}

// 使用SiliconFlow免费API生成摘要
export async function generateSummary(text: string, apiKey?: string): Promise<string> {
  // 如果没有APIKey，返回原文前100字
  if (!apiKey) {
    return text.slice(0, 100) + '...'
  }
  
  const result = await generateWithSiliconFlow(text, apiKey)
  if (result.success) {
    return result.summary
  }
  
  // 降级：返回原文前100字
  console.error('AI摘要生成失败，使用原文摘要:', result.error)
  return text.slice(0, 100) + '...'
}

// 批量生成摘要（带并发限制）
export async function generateSummaries(
  texts: string[],
  apiKey: string,
  concurrency: number = 3
): Promise<string[]> {
  const results: string[] = []
  
  for (let i = 0; i < texts.length; i += concurrency) {
    const batch = texts.slice(i, i + concurrency)
    const batchResults = await Promise.all(
      batch.map(text => generateSummary(text, apiKey))
    )
    results.push(...batchResults)
    console.log(`摘要进度: ${Math.min(i + concurrency, texts.length)}/${texts.length}`)
    
    // 避免API限流
    if (i + concurrency < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  return results
}