/**
 * The shape that all section documents share in the database, before
 * template-specific validation. The API stores these as embedded
 * sub-documents inside `pages.sections` and `pageVersions.sections`.
 */
export interface BaseSectionDocument {
  _id: string
  templateKey: string
  variant: string | null
  theme: 'light' | 'dark' | null
  position: number
  visible: boolean
  slots: Record<string, unknown>
}

export type SectionStatus = 'draft' | 'in_review' | 'approved' | 'published'

export interface PageDocument {
  _id: string
  slug: string
  title: string
  status: SectionStatus
  sections: BaseSectionDocument[]
  createdAt: string
  updatedAt: string
  updatedBy: string
}

export interface PageVersionDocument {
  _id: string
  pageId: string
  version: number
  isCurrent: boolean
  publishedBy: string
  publishedAt: string
  sections: BaseSectionDocument[]
}
