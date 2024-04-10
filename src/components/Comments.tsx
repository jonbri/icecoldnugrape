import { Comment } from "../types";

interface CommentsProps {
  comments: Comment[];
}
const Comments = ({ comments }: CommentsProps) => (
  <div className="comments">
    <ul>
      {comments.map(({ name, text, time }) => (
        <li key={time}>
          <h3>{`${name} (${time.split(" ")[0]})`}</h3>
          {text}
        </li>
      ))}
    </ul>
  </div>
);

export default Comments;
