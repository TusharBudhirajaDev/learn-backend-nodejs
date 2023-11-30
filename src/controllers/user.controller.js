import { asyncHandler } from "../utilis/asyncHandler.js";
import { ApiError } from "../utilis/ApiError.js";
import { User } from "../models/User.model.js";
import uploadOnCloudinary from "../utilis/cloudinary.js";
import { ApiResponse } from "../utilis/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  /* Algorithm or steps 

  1. get user details from frontend/client
  2. validation - not empty
  3. check if user is already exists: username, email
  4. check for image, check for avatar
  5. upload them to cloudinary
  6. create user object - create entry in db
  7. remove passward and refresh token from response
  8. check for user creation
  9. return res
  */
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username, email }],
  });

  if (existedUser)
    throw new ApiError(409, "User with email or username already existed");

  // as we user middleware(multer) in the user router so its provide me the more options like req.files to catch the file uploaded

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // validation for required field of avatar
  if (!avatar) throw new ApiError(400, "Avatar is required");

  // upload to cloudinary --> uploading a image to server, sometime takes time. so we have to await for it to be completed
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  // check for user creation and remove passward and refresh token from response
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );

  if (!createdUser) throw new ApiError(500, "Something went wrong while");

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registed Successfully"));
});

export { registerUser };
