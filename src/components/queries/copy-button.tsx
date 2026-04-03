'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface CopyButtonProps {
  sql: string
  className?: string
}

/**
 * SQL 코드를 클립보드에 복사하는 클라이언트 컴포넌트
 * 복사 완료 시 토스트 알림 표시
 */
export function CopyButton({ sql, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(sql)
      setCopied(true)
      toast.success('SQL이 클립보드에 복사되었습니다.')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('복사에 실패했습니다.')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      className={className}
      aria-label="SQL 복사"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}
