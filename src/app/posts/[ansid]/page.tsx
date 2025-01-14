import { PageWrapper } from "~/components/page-transition-wrapper";
import { api } from "~/trpc/server";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";
import PostAnswer from "~/components/ui/post_answer";
import { getServerAuthSession } from "~/server/auth";

export default async function AnsPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await api.post.fetch.query({ id: params.id });
  const ans = await api.ans.fetch.query({ id: params.id });
  const session = await getServerAuthSession();

  if (!post) {
    return (
      <PageWrapper className={`flex min-h-screen items-center justify-center`}>
        <div>
          <h1 className={`mb-2 text-center text-2xl font-bold`}>
            Post not found
          </h1>
          <p>
            Maybe the id is wrong? 🤔
            <Link href={`/posts/`} className={`ml-4 underline`}>
              Go back
            </Link>
          </p>
        </div>
      </PageWrapper>
    );
  }

  const user = await api.user.fetch.query({ id: post.authorId ?? "" });

  return (
    <PageWrapper className={`pt-16`}>
      <div className={`p-10`}>
        <div className={`flex`}>
          {user?.name && (
            <div className={`px-6  pt-2`}>
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <AvatarFallback className={`hover:border`}>
                    {user.name.charAt(0) + user.name.charAt(1)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          )}
          <div>
            <h1 className={`mb-6 text-2xl font-bold`}>{post.title}</h1>
            <p className={"whitespace-pre-line"}>{post.description}</p>
          </div>
        </div>
        <hr className={`my-6`} />
        <PostAnswer isSignedIn={session !== null} />
        {/* {code for commentbox} */}
        <div className={"whitespace-pre-line"}>
            {ans?.description}
        </div>

      </div>
    </PageWrapper>
  );
}
