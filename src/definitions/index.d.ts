import { Location } from "history";

export interface MdxProps {
  colorCode?: string;
  colorName?: string;
  colorHEX?: string;
  colorHEXDark: string;
  colors?: sting[];
}

interface EmptyProps {}

interface ListProps {
  term?: string;
  definition?: string;
}

interface HeadingsProps {
  text?: string;
  itemProp?: string;
}

interface ArticleCardProps {
  link?: any;
  title?: string;
  order?: number;
  description?: any;
  tags?: keyof JSX.IntrinsicElements | string;
  date?: string;
}

interface PageProps {
  data: {
    mdx: INode;
    previous: INode;
    next: INode;
    tag: INode;
    slug: INode;
    allMdx: {
      totalCount: INode;
      edges: IEdge[];
    };
    site: ISite;
  };
  location: Location;
  pageContext: any;
}

interface ISite {
  siteMetadata: {
    title: string;
    description: string;
    author: {
      name: string;
      summary: string;
    };
    social: {
      twitter: string;
      linkedin: string;
      github: string;
    };
  };
}

interface IEdge {
  node: INode;
}

interface ITag {
  tags?: keyof JSX.IntrinsicElements | string;
}

interface INode {
  excerpt: string;
  body: string;
  fields: {
    slug: string;
  };
  frontmatter: {
    order: number;
    date: string;
    title: string;
    tags?: string;
    description: string;
  };
}

export interface FormField {
  type: string
  name: string
  label?: string
  initial: string
  className?: string
  element: 'input' | 'textarea'
}

export type FormDataState = { [key: string]: string }

export type FormSubmitState = 'INITIAL' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'
