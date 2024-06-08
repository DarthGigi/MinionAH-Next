import { formatNumber } from "~/lib/utilities";
import type { ReactElement } from "react";

export const MinionTemplate = ({
  minion,
  coinImageData,
  romanNumerals
}: {
  minion: {
    minion: {
      id: string;
      name: string;
      generator_tier: number;
    };
    user: {
      id: string;
      username: string;
    };
    price: number;
    amount: number | null;
  };
  coinImageData: ArrayBuffer;
  romanNumerals: boolean;
}): ReactElement => {
  return (
    <div tw="flex h-full w-full flex-col items-center justify-center bg-[#171717] py-6">
      <div tw="flex w-full max-w-2xl flex-col rounded-lg border h-full border-[#404040] bg-[#262626] shadow">
        <div tw="mx-auto flex flex-col items-center rounded py-10">
          <div tw="flex mb-3 items-center h-44 w-44 overflow-hidden p-6 justify-center rounded-full bg-[#404040]">
            <img tw="h-40 w-40 p-4" src={`https://res.cloudinary.com/minionah/image/upload/v1/users/avatars/${minion.user.id}`} />
          </div>
          <span tw="text-4xl font-medium text-[#fafafa]">{minion.user.username}</span>
        </div>
        <div tw="flex w-full mt-2 flex-col items-center justify-center">
          <div tw="flex h-24 w-24 rounded-full bg-[#404040] p-1">
            <img tw="h-full w-full" src={`https://res.cloudinary.com/minionah/image/upload/v1/minions/head/${minion.minion.id}`} />
          </div>
          <span tw="text-3xl mt-3 font-medium text-[#fafafa]">{minion.minion.name.replace(/ [IVX]+$/, "")}</span>
          <div tw="mx-auto mt-4 flex w-full items-center justify-center border-t border-[#404040]">
            <div tw="relative flex w-0 flex-1 items-center justify-center overflow-hidden text-2xl font-medium">
              <span tw="flex-shrink-0 rounded-full bg-[#a3a3a3] px-3 py-0.5 text-2xl font-medium text-[#262626]">{romanNumerals ? `Tier ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][minion.minion.generator_tier - 1]}` : `Tier ${minion.minion.generator_tier}`}</span>
            </div>
            <div tw="relative border-l border-r border-[#404040] -ml-px flex w-0 flex-1 overflow-hidden">
              <span tw="relative w-0 flex-1 items-center justify-center overflow-hidden py-4 text-2xl font-medium text-[#e6e6e6]">
                <img tw="absolute left-4 h-10 w-10" src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(coinImageData)))}`} />
                <div tw="flex flex-col justify-center items-center">
                  {formatNumber(minion.price)}
                  {minion.amount! > 1 && <span tw="text-2xl text-[#e6e6e6]/50">/each</span>}
                </div>
              </span>
            </div>
            <div tw="relative flex w-0 flex-1 items-center justify-center text-sm font-medium">
              <span tw="flex-shrink-0 rounded-full bg-[#a3a3a3] px-3 py-0.5 text-2xl font-medium text-[#262626]">{` Amount: ${minion.amount}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
