import { getProjects, getCategories } from "./workspace";

export function newListFormIsValid(formData) {
  const list = getCategories();
  if (list.includes(formData["list-name"])) {
    return Response(false, "This name already exists in categories");
  }
  return Response(true);
}

function Response(v, m = null) {
  return { valid: v, message: m };
}
