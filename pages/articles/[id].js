import {
  Container,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Textarea,
  Input,
  Divider,
  Image,
  Flex,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useState } from "react";
import NavButtons from "../../components/navButtons";

export const getServerSideProps = async (context) => {
  const res = await fetch("http://localhost:3000/api/articles/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const numOfArticles = data.length;
  let article = data.filter((article) => article.id == context.query.id);

  article = article[0];
  return {
    props: { article, numOfArticles },
  };
};

export default function Article({ article, numOfArticles }) {
  const section = "articles";
  const [numOfLikes, setNumOfLikes] = useState(article.likes);
  const [liked, setLiked] = useState(false);
  const handleLike = async () => {
    const previousLikeCount = numOfLikes;
    // if it was already liked, remove it
    if (liked) {
      setLiked(false);
      const res = await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({ addOrRemoveLike: "removeLike", id: article.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setNumOfLikes(previousLikeCount - 1);
    }
    // if it wasn't previously liked, add it
    else {
      setLiked(true);
      const res = await fetch("/api/likes", {
        method: "POST",
        body: JSON.stringify({ addOrRemoveLike: "addLike", id: article.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setNumOfLikes(previousLikeCount + 1);
    }
  };

  const [comments, setComments] = useState(article.comments);
  const [isCommenting, setIsCommenting] = useState(false);

  const initialCommentValues = {
    username: "",
    content: "",
  };
  const handleCommenting = () => {
    isCommenting ? setIsCommenting(false) : setIsCommenting(true);
  };
  const [currentComment, setCurrentComment] = useState(initialCommentValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment({
      ...currentComment,
      [name]: value,
    });
  };

  const postComment = async (e) => {
    // console.log('date in res: ', new Date().toDateString())
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: currentComment.content,
        id: article.id,
        name: currentComment.username,
        date: new Date().toDateString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res: ", res);
    const data = await res.json();
    setComments([currentComment, ...comments]);
    setCurrentComment(initialCommentValues);
    setIsCommenting(false);
  };

  return (
    <Container maxW="2xl" minH="sm" pt={5}>
      <Card key={article.id}>
        <CardHeader>
          <Heading size="md">{article.title}</Heading>
        </CardHeader>
        <Image
          objectFit='cover'
          minW="sm"
          alignSelf="center"
          src="https://picsum.photos/300/200"
          alt="Chakra UI"
        />
        <CardBody>
          <Text>{article.content}</Text>
        </CardBody>
        <Text alignSelf="flex-end" p={5}>
          {numOfLikes > 0 &&
            `${numOfLikes}${numOfLikes > 1 ? " Likes" : " Like"}`}
        </Text>
        <CardFooter
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" m={3} onClick={handleLike}>
            Like{!liked && <AiOutlineLike pl={6} />}
            {liked && <AiFillLike pl={6} />}
          </Button>
          <Button flex="1" variant="ghost" m={3} onClick={handleCommenting}>
            Comment
            <AiOutlineComment pl={6} />
          </Button>
          <Button flex="1" variant="ghost" m={3}>
            Share
            <AiOutlineShareAlt pl={6} />
          </Button>
          <Divider />
          {!comments.length && !isCommenting && (
            <Text>Be the first to comment.</Text>
          )}
          {isCommenting && (
            <Container>
              <Input
                placeholder="Name"
                onChange={handleChange}
                value={currentComment.username}
                name="username"
                required
              />
              <Textarea
                placeholder="Leave a Comment"
                onChange={handleChange}
                value={currentComment.content}
                name="content"
                required
              />
              <Button
                backgroundColor="tertiary.dark"
                color="white"
                onClick={postComment}
                mt={3}
              >
                Add Comment
              </Button>
            </Container>
          )}
          <Container>
            {comments.length > 0 &&
              comments.map((comment, i) => (
                <Flex key={i} direction="column" maxW="lg">
                  <Flex direction="row" justifyContent="space-between">
                    <Text pt={5} fontSize="sm" color="grey">
                      {comment.commenter}
                    </Text>
                    <Text pt={5} fontSize="sm" color="grey">
                      {new Date(comment.date_written).toDateString()}
                    </Text>
                  </Flex>
                  <Text minW="3xl">{comment.content}</Text>
                </Flex>
              ))}
          </Container>
        </CardFooter>
      </Card>
      <NavButtons numOfExercises={numOfArticles} section={section} />
    </Container>
  );
}
