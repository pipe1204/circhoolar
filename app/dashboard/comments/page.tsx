"use client";

import React from "react";
import Masonry from "react-masonry-css";
import { useSchoolCodeStore } from "@/store/store";
import Billboard from "@/components/Billboard";
import useFetchComments from "@/hooks/useFetchComments";
import CommentItem from "@/components/community/CommentItem";
import { Comment } from "@/types/Types";
import useCreateAndDeleteComment from "@/hooks/useCreateComment";
import Link from "next/link";

const page = () => {
  const schoolCode = useSchoolCodeStore((state) => state.schoolCode);

  const { userComments, fetchSingleComment } = useFetchComments();
  const { onDeleteComment } = useCreateAndDeleteComment();

  const breakpointColumnsObj = {
    default: 2,
    1100: 3,
    // 700: 2,
    500: 1,
  };

  const handleDelete = (comment: Comment) => {
    onDeleteComment(comment);
  };

  if (schoolCode !== null && userComments.length === 0) {
    return (
      <section className="p-2">
        <Billboard text="There are no posts at the moment" />
      </section>
    );
  }
  console.log(userComments);
  return (
    <section className="p-2 mb-28 xl:mb-0">
      <div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {userComments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="bg-light-white border border-gray-50 shadow-sm hover:shadow-md hover:border-paragraph-color rounded-md"
            >
              <Link href={`/dashboard/community/${comment?.questionId}`}>
                <CommentItem
                  comment={comment}
                  handleDelete={handleDelete}
                  fetchSingleComment={fetchSingleComment}
                />
              </Link>
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};

export default page;
