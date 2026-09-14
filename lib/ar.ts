const categoryLabels: Record<string, string> = {
  all: 'الكل',
  skincare: 'العناية بالبشرة',
  lips: 'الشفاه',
  eyes: 'العيون',
  beauty: 'الجمال',
  'new addition': 'إضافة جديدة',
}

export function normalizeCategory(category: string) {
  return category.trim().toLowerCase()
}

export function translateCategory(category: string) {
  return categoryLabels[normalizeCategory(category)] ?? category
}

export const storefrontCategories = [
  { value: 'All', label: 'الكل' },
  { value: 'Skincare', label: 'العناية بالبشرة' },
  { value: 'Lips', label: 'الشفاه' },
  { value: 'Eyes', label: 'العيون' },
] as const

export const adminCategories = [
  { value: 'skincare', label: 'العناية بالبشرة' },
  { value: 'lips', label: 'الشفاه' },
  { value: 'eyes', label: 'العيون' },
  { value: 'beauty', label: 'الجمال' },
] as const

export function joinTags(tags: string[] | null | undefined) {
  return (tags ?? []).join('، ')
}

export function matchesCategory(productCategory: string, filterValue: string) {
  if (filterValue === 'All') return true
  return normalizeCategory(productCategory) === normalizeCategory(filterValue)
}
