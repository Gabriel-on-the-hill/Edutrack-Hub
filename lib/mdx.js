import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const POSTS_PATH = path.join(root, 'content/blog');

export const getPostSlugs = () => {
    if (!fs.existsSync(POSTS_PATH)) return [];
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path));
};

export const getPostBySlug = (slug) => {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            meta: data,
            content,
        };
    } catch (e) {
        return null;
    }
};

export const getAllPosts = () => {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .filter(post => post !== null)
        .sort((a, b) => new Date(b.meta.date) - new Date(a.meta.date));

    return posts;
};
