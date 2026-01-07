export const aboutPath = "/about";
export const postsPath = "/posts";

export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;
export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;
