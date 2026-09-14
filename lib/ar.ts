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

export function matchesCategory(productCategory: string, filterValue: string) {
  if (filterValue === 'All') return true
  return normalizeCategory(productCategory) === normalizeCategory(filterValue)
}
