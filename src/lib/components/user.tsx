import type { ReactElement } from "react";

export const UserTemplate = ({
  user,
}: {
  user: {
    id: string;
    username: string;
  };
}): ReactElement => {
  return (
    <div tw="flex h-full w-full flex-col items-center justify-center bg-[#171717]">
      <div tw="flex w-full max-w-2xl justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow">
        <div tw="mx-auto flex flex-col items-center rounded py-20">
          <div tw="flex mb-3 items-center h-44 w-44 shadow-lg overflow-hidden justify-center rounded-full bg-neutral-700">
            <img
              tw="h-full w-full p-4"
              src={`https://res.cloudinary.com/minionah/image/upload/v1/users/avatars/${user.id}`}
            />
          </div>
          <span tw="mb-1 text-4xl font-medium text-white">{user.username}</span>
        </div>
      </div>
    </div>
  );
};
