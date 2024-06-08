import type { ReactElement } from "react";

export const UserTemplate = ({
  user
}: {
  user: {
    id: string;
    username: string;
    settings: {
      profileSettings: {
        bio: string;
        urls: string[];
      };
    };
  };
}): ReactElement => {
  return (
    <div tw="flex h-full w-full flex-col items-center justify-center bg-[#171717] py-6">
      <div tw="flex w-full max-w-2xl justify-center rounded-lg border h-full border-[#404040] bg-[#262626] shadow">
        <div tw="mx-auto flex flex-col items-center rounded justify-center">
          <div tw="flex mb-3 items-center h-44 w-44 overflow-hidden p-6 justify-center rounded-full bg-[#404040]">
            <img tw="h-40 w-40 p-4" src={`https://res.cloudinary.com/minionah/image/upload/v1/users/avatars/${user.id}`} />
          </div>
          <span tw="mt-10 text-4xl font-medium text-[#fafafa]">{user.username}</span>
          {user.settings?.profileSettings?.bio && <span tw="mt-3 text-sm text-[#a3a3a3]">{user.settings.profileSettings.bio}</span>}
          {user.settings?.profileSettings?.urls && (
            <div tw="mt-10 flex flex-wrap">
              {user.settings?.profileSettings?.urls?.map((url, index) => (
                <div key={index} tw="flex overflow-hidden rounded-full">
                  <img tw="h-16 w-16 mx-4 rounded-full bg-[#404040] p-0.5" height="64px" width="64px" src={`https://www.google.com/s2/favicons?sz=256&domain_url=${url}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
