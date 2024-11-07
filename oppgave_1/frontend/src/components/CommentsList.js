import React from "react";

const CommentsList = ({ lessonComments }) => (
  <ul className="mt-8" data-testid="comments_list">
    {lessonComments.length > 0 ? (
      lessonComments.map((c) => (
        <li className="mb-6 rounded border border-slate-200 px-4 py-6" key={c.id}>
          <h5 data-testid="user_comment_name" className="font-bold">{c.createdBy.name}</h5>
          <p data-testid="user_comment">{c.comment}</p>
        </li>
      ))
    ) : (
      <p>Ingen kommentarer</p>
    )}
  </ul>
);

export default CommentsList;
