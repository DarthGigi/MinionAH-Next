import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";
import { env } from "~/env";

export interface AuctionReminderEmailProps {
  username: string;
  auctions: {
    id: string;
    name: string;
    amount: string;
    minion: {
      id: string;
      name: string;
    };
  }[];
}

const chunk = <T,>(arr: T[], size: number): T[][] => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const baseUrl = env.BASE_URL ? `https://${env.BASE_URL}` : "";

export const AuctionReminderEmail = ({ username, auctions }: AuctionReminderEmailProps) => {
  const previewText = `${auctions.length} auction${auctions.length > 1 ? "s" : ""} of yours ${auctions.length > 1 ? "are" : "is"} about to expire!`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#171717] px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#404040] bg-[#262626] p-[20px]">
            <Section>
              <Img src={`${baseUrl}/favicon.png`} width="52" height="52" alt="MinionAH" className="mx-auto my-0" />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-[#e6e6e6]">Auction Reminder</Heading>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">Hello {username},</Text>
            <Text className="text-[14px] leading-[24px] text-[#e6e6e6]">
              {auctions.length} auction{auctions.length > 1 ? "s" : ""} of yours {auctions.length > 1 ? "are" : "is"} about to expire!
            </Text>
            <Section>
              {chunk(auctions, 3).map((auctionGroup, groupIndex) => (
                <Row key={groupIndex} className="my-4">
                  {auctionGroup.map((auction) => (
                    <Column key={auction.id} align="center">
                      <Link href={`${baseUrl}/profile`} className="text-white underline">
                        <div className="w-fit rounded-full bg-[#404040] p-6">
                          <Img className="size-[4.5rem] overflow-visible" src={`https://res.cloudinary.com/minionah/image/upload/v1/minions/head/${auction.minion.id}`} width="72" height="72" />
                        </div>
                      </Link>
                    </Column>
                  ))}
                </Row>
              ))}
            </Section>
            <Section className="mt-[32px] text-center">
              <Button className="rounded bg-[#e6e6e6] px-5 py-3 text-center text-[12px] font-semibold text-[#171717] no-underline" href={`${baseUrl}/profile`}>
                View Auction{auctions.length > 1 ? "s" : ""}
              </Button>
            </Section>
            <Hr className="mx-0 mb-[20px] mt-[26px] w-full border border-solid border-[#404040]" />
            <Section className="text-center">
              <Text className="m-0 text-[12px] leading-[24px] text-[#666666]">
                Don&apos;t want to receive these emails? <br />
                <Link href={`${baseUrl}/settings/notifications`} className="text-[#666666] underline">
                  Manage your notification settings
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

AuctionReminderEmail.PreviewProps = {
  username: "DarthGigi",
  auctions: [
    {
      id: "1",
      name: "Snow Minion VI",
      amount: "123",
      minion: {
        id: "SNOW_GENERATOR_6",
        name: "Snow Minion VI"
      }
    },
    {
      id: "2",
      name: "Snow Minion VII",
      amount: "123",
      minion: {
        id: "SNOW_GENERATOR_7",
        name: "Snow Minion VII"
      }
    },
    {
      id: "3",
      name: "Snow Minion VIII",
      amount: "123",
      minion: {
        id: "SNOW_GENERATOR_8",
        name: "Snow Minion VIII"
      }
    },
    {
      id: "4",
      name: "Snow Minion IX",
      amount: "123",
      minion: {
        id: "SNOW_GENERATOR_9",
        name: "Snow Minion IX"
      }
    },
    {
      id: "5",
      name: "Snow Minion X",
      amount: "123",
      minion: {
        id: "SNOW_GENERATOR_10",
        name: "Snow Minion X"
      }
    }
  ]
} as AuctionReminderEmailProps;

export default AuctionReminderEmail;
