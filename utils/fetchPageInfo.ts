import { groq } from "next-sanity";
import { sanityClient } from "../sanity";
import { PageInfo } from "../typings";

const query = groq`
  *[_type == "pageInfo"][0] // Fetch only the first document
`;

export const fetchPageInfo = async (): Promise<PageInfo> => {
  const pageInfo: PageInfo = await sanityClient.fetch(query);
  return pageInfo;
};
