'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useDebounce } from 'use-debounce'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SearchFilterProps {
  /** 현재 검색 키워드 */
  currentQ: string
  /** 현재 선택된 DBMS */
  currentDbms: string
  /** 현재 선택된 태그 */
  currentTag: string
  /** 전체 DBMS 목록 */
  dbmsList: string[]
  /** 전체 태그 목록 */
  tagList: string[]
}

/**
 * 검색 및 필터링 클라이언트 컴포넌트
 * URL searchParams를 통해 상태를 관리 (App Router 서버 컴포넌트 연동)
 */
export function SearchFilter({
  currentQ,
  currentDbms,
  currentTag,
  dbmsList,
  tagList,
}: SearchFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * URL searchParams를 업데이트하는 헬퍼 함수
   */
  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  /**
   * 키워드 입력 핸들러 (300ms debounce)
   */
  const [handleSearchChange] = useDebounce(
    (value: string) => updateParams({ q: value || undefined }),
    300
  )

  /** 필터 전체 초기화 */
  function handleReset() {
    router.push(pathname)
  }

  const hasActiveFilters = currentQ || currentDbms || currentTag

  return (
    <div className="space-y-4">
      {/* 키워드 검색 */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="text"
          placeholder="쿼리명 또는 설명으로 검색..."
          defaultValue={currentQ}
          onChange={e => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* DBMS 필터 + 필터 초기화 */}
      <div className="flex items-center gap-3">
        <Select
          value={currentDbms || 'all'}
          onValueChange={value =>
            updateParams({ dbms: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="DBMS 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 DBMS</SelectItem>
            {dbmsList.map(dbms => (
              <SelectItem key={dbms} value={dbms}>
                {dbms}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            필터 초기화
          </Button>
        )}
      </div>

      {/* 태그 필터 버튼 그룹 */}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tagList.map(tag => (
            <Badge
              key={tag}
              variant={currentTag === tag ? 'default' : 'outline'}
              className="cursor-pointer transition-colors"
              onClick={() =>
                updateParams({ tag: currentTag === tag ? undefined : tag })
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
