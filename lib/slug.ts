// "10th Mathematics (CBSE)" becomes "10th-mathematics-cbse".
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function linesToList(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

// Gives every course a unique URL slug. A slug saved in the admin always wins; courses
// without one get a slug from their name, with a number added when two names collide.
export function withCourseSlugs<T extends { id: string; name: string; slug?: string }>(
  courses: T[]
): (T & { slug: string })[] {
  const used = new Set(courses.map((c) => c.slug).filter((s): s is string => Boolean(s)));
  return courses.map((c) => {
    if (c.slug) return { ...c, slug: c.slug };
    const base = slugify(c.name) || c.id;
    let slug = base;
    for (let n = 2; used.has(slug); n++) slug = `${base}-${n}`;
    used.add(slug);
    return { ...c, slug };
  });
}
