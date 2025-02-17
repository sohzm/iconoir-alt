import type { NextPage } from 'next';
import type { Icon } from '../components/IconList';
import { downloads as npmDownloads } from '@nodesecure/npm-registry-sdk';
import styled from 'styled-components';
import { AvailableFor } from '../components/AvailableFor';
import { LargeButton } from '../components/Button';
import { Explore } from '../components/Explore';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { HeaderBackground } from '../components/HeaderBackground';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
import { Stat, StatsContainer } from '../components/Stats';
import { Text15, Text18 } from '../components/Typography';
import { REPO, SUPPORT_LINK } from '../lib/constants';
import { getHeaderProps } from '../lib/getHeaderProps';
import { getAllIcons } from '../lib/getIcons';
import { octokit } from '../lib/octokit';
import { media } from '../lib/responsive';

const HeroHead = styled.div`
  margin: 60px auto 40px auto;
  ${media.md} {
    margin: 160px auto 80px auto;
  }
`;

export const HeroText = styled.h1`
  font-size: 50px;
  font-weight: 700;
  color: var(--g0);
  margin: 0 auto;
  letter-spacing: -0.035em;
  line-height: 1;
  text-align: center;
  transition: 0.3s;
  ${media.md} {
    font-size: 90px;
    padding: 0 20px;
    letter-spacing: -0.045em;
    -webkit-text-stroke: 2.5px;
  }
  &:hover {
    transform: scale(1.04);
    transition: 0.3s;
  }
`;
export const HeroTextSecondary = styled(HeroText)`
  color: var(--g4);
  max-width: 1140px;
`;

const HeroDescription = styled(Text18)<{ topMargin?: number }>`
  display: block;
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
  ${media.lg} {
    margin-top: ${(props) => props.topMargin || 0}px;
  }
`;

const Supporters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px !important;
`;

const Supporter = styled.div<{ src?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #000;
  margin: 0 10px;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 2px solid white;
  margin: 0 -4px;
  transition: 0.2s;
  &:hover {
    scale: 1.1;
    transition: 0.2s;
    &:before {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: black;
      color: white;
      padding: 5px;
      border-radius: 3px;
      white-space: nowrap;
      font-size: 12px;
    }
  }
`;

const SupportContainer = styled.div`
  text-align: center;
  > * {
    margin: 0 auto;
    max-width: 750px;
  }
  > :not(:last-child) {
    margin-bottom: 30px;
  }
  margin-bottom: 50px;
  ${media.sm} {
    margin-bottom: 110px;
  }
`;

interface HomeProps {
  allIcons: Icon[];
  currentVersion: string;
  numStars: number;
  numDownloads: number;
}

const Home: NextPage<HomeProps> = ({
  allIcons,
  currentVersion,
  numStars,
  numDownloads,
}) => {
  return (
    <>
      <Layout>
        <SEO
          description="Iconoir is the biggest open source icon library that provides a massive selection of high-quality icons, available for free download. No premium options or email sign-up required, free for real. Icons available in SVG, Font, React, React Nativ, and Flutter libraries, Figma and Framer."
        />
        <Explore allIcons={allIcons} />
      </Layout>
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const headerProps = getHeaderProps();

  const {
    data: { stargazers_count: numStars },
  } = await octokit.rest.repos.get({
    ...REPO,
  });

  // if (!numStars)
  //   throw new Error('Could not find GitHub stars');
  // noooo wtf ???

  const { downloads: numDownloads } = await npmDownloads(
    'iconoir-react',
    'last-month',
  );

  // if (!numDownloads)
  //   throw new Error('Could not find NPM downloads');
  // again no

  return {
    props: {
      ...headerProps,
      allIcons: await getAllIcons(),
      numStars,
      numDownloads,
    },
  };
}
