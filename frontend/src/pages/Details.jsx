import { redirect, useRouteLoaderData } from "react-router-dom";
import PostDetails from "../components/PostDetails";
import { getToken } from "../util/auth";

const Details = () => {
  const post = useRouteLoaderData("post-detail");
  return (
    <>
      <PostDetails post={post} />
    </>
  );
};

export default Details;

export const loader = async ({ request, params }) => {
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/posts/${params.id}`);

  if (!response.ok) {
  } else {
    const data = await response.json();
    return data.post;
  }
};

// delete action
export const action = async ({ request, params }) => {
  const token = getToken();
  const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/posts/${params.id}`, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("");
  }
  return redirect("/");
};
