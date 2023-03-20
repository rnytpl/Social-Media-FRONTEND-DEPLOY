import {
  // EditOutlined,
  // DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Close,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  useTheme,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { FlexBetween } from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import LoadingButton from "components/LoadingButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "features/posts/postsApiSlice";

const MyPostWidget = () => {
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();

  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id, picturePath } = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    if (isSuccess) {
      setImage(null);
      setPost("");
    }
  }, [isSuccess]);

  const handlePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", _id);
    data.append("description", post);

    if (image) {
      data.append("picture", image);
      data.append("picturePath", image.name);
    }
    await createPost([data]);
  };

  return (
    <WidgetWrapper mb="1.25rem">
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind?"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpeg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <FlexBetween
                  {...getRootProps()}
                  flexDirection="column"
                  height="50px"
                >
                  {image ? (
                    <FlexBetween
                      justifyContent="space-between"
                      gap="2.25rem"
                      margin="auto"
                    >
                      <Typography sx={{ position: "relative" }}>
                        {image.path}
                        <IconButton
                          onClick={() => setImage("")}
                          sx={{
                            position: "absolute",
                            padding: "0",
                            top: "0",
                            color: "red",
                            width: "15px",
                            ml: "0.25rem",
                          }}
                        >
                          <Close sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      </Typography>
                    </FlexBetween>
                  ) : (
                    <Box margin="auto">
                      <TextField
                        type="file"
                        {...getInputProps()}
                        name="picture"
                      />
                      <Typography>
                        Drag 'n' drop some files here, or click to select files
                      </Typography>
                    </Box>
                  )}
                </FlexBetween>
              );
            }}
          </Dropzone>
        </Box>
      )}
      <Divider sx={{ margin: "1.25rem 0" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&hover": { cursor: "pointer", color: medium } }}
          ></Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          </>
        )}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        )}
      </FlexBetween>
    </WidgetWrapper>
  );
};
export default MyPostWidget;
