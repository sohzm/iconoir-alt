import type { Icon, IconListFilters } from './IconList';
import { IconoirProvider } from 'iconoir-react';
import React from 'react';
import styled from 'styled-components';
import { media } from '../lib/responsive';
import { CustomizationEditor } from './CustomizationEditor';
import { FiltersEditor } from './FiltersEditor';
import { IconList } from './IconList';
import { Streamline } from './Streamline';
import { useCustomizationPersistence } from './useCustomizationPersistence';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${media.md} {
    align-items: flex-start;
    flex-direction: row;
  }
`;

const Left = styled.div`
  flex: 1;
  min-height: calc(100vh - 100px);
  background: white;
  ${media.md} {
    background: none;
  }
`;

const Right = styled.div`
  position: sticky;
  top: 20px;
  width: 275px;
  display: block;
  ${media.md} {
    margin-left: 68px;
    z-index: 1;
  }
`;

const FilterContainer = styled.div<{ $isMobile?: boolean }>`
  display: ${(props) => (props.$isMobile ? 'block' : 'none')};
  margin-bottom: 40px;
  position: sticky;
  top: 20px;
  z-index: 100;
  width: 100%;
  ${media.md} {
    position: relative;
    top: 0;
    display: ${(props) => (props.$isMobile ? 'none' : 'block')};
    margin-bottom: 10px;
  }
`;

export interface ExploreProps {
  allIcons: Icon[];
}

export function Explore({ allIcons }: ExploreProps) {
  const [filters, setFilters] = React.useState<IconListFilters>({});
  const [customizations, setCustomizations] = useCustomizationPersistence();

  const lightTheme = {
    "--black-40": "rgba(0, 0, 0, 0.4)",
    "--black-60": "rgba(0, 0, 0, 0.6)",
    "--black-80": "rgba(0, 0, 0, 0.8)",
    "--black": "#000000",
    "--darker-gray": "#484848",
    "--dark-gray": "#626262",
    "--pink": "#ffebe4",
    "--blue": "#e4f9ff",
    "--green": "#e4ffe4",
    "--gray": "#e7e7e7",
    "--gray-100": "#cdcdd3",
    "--gray-200": "#f9f9fa",
    "--g0": "#1c2226",
    "--g1": "#4f5d69",
    "--g4": "#bcc9d2",
    "--g5": "#e0e6eb",
    "--g6": "#ecf0f4",
    "--g7": "#f8fafd",
    "--light-gray": "#f2f2f2",
    "--lighter-gray": "#f9f9f9",
    "--super-light-gray": "#fbfbfb",
    "--white-80": "rgba(255, 255, 255, 0.8)",
    "--white": "#ffffff",
    "--accent": "#1e5af6",
  };

  const darkTheme = {
    "--black-40": "rgba(255, 255, 255, 0.4)",
    "--black-60": "rgba(255, 255, 255, 0.6)",
    "--black-80": "rgba(255, 255, 255, 0.8)",
    "--black": "#ffffff",
    "--darker-gray": "#f2f2f2",
    "--dark-gray": "#e0e6eb",
    "--pink": "#3b2b2b",
    "--blue": "#2b3b4f",
    "--green": "#2b4f2b",
    "--gray": "#333333",
    "--gray-100": "#484848",
    "--gray-200": "#222222",
    "--g0": "#ffffff",
    "--g1": "#e0e6eb",
    "--g4": "#626262",
    "--g5": "#484848",
    "--g6": "#333333",
    "--g7": "#1c2226",
    "--light-gray": "#484848",
    "--lighter-gray": "#333333",
    "--super-light-gray": "#222222",
    "--white-80": "rgba(0, 0, 0, 0.8)",
    "--white": "#121212",
    "--accent": "#1e5af6",
  };

  const [theme, setTheme] = useState("light");

  const applyTheme = (themeName) => {
    const selectedTheme = themeName === "light" ? lightTheme : darkTheme;
    Object.keys(selectedTheme).forEach((key) => {
      document.documentElement.style.setProperty(key, selectedTheme[key]);
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Container>
      <Left>
        <FilterContainer $isMobile>
          <FiltersEditor filters={filters} onChange={setFilters} />
        </FilterContainer>
        <IconoirProvider
          iconProps={{
            color: customizations.hexColor,
            width: customizations.size ? `${customizations.size}px` : undefined,
            height: customizations.size
              ? `${customizations.size}px`
              : undefined,
            strokeWidth: customizations.strokeWidth,
          }}
        >
          <IconList filters={filters} allIcons={allIcons} />
        </IconoirProvider>
      </Left>
      <Right>
        <FilterContainer>
          <FiltersEditor filters={filters} onChange={setFilters} />
        </FilterContainer>
        <CustomizationEditor
          customizations={customizations}
          onChange={setCustomizations}
        />

        <p
        style={{
          marginBottom: "20px",
          color: "var(--black)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
        >
        I like Iconoir, but I don't like their website, so I decided
        to make my own version of it.
          <button
        onClick={toggleTheme}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          outline: "none",
          background: "var(--g4)",
          color: "var(--black)",
          border: "none",
          borderRadius: "5px",
        }}
        >
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        </p>
      </Right>
    </Container>
  );
}
