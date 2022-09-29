import * as React from "react";
import { graphql } from "gatsby";
import { ContentfulRichTech, SocialButton } from "../components";

const getFirstAndOtherNames = (string) => {
  if (!string) return string;
  const ret = [];

  const strings = string.split(" ");
  if (strings.length <= 0) return string;

  ret.push(strings[0]);

  if (strings.length > 1) ret.push(strings.slice(1).join(" "));

  return ret;
};

const IndexPage = ({ data }) => {
  const [firstName, otherNames] = getFirstAndOtherNames(
    data.contentfulHome.title
  );

  return (
    <>
      <section className="md:flex">
        <div className="bg-gray-100  py-10 flex justify-center md:w-1/3 md:py-40">
          <img
            src={`${data.contentfulHome.profilePhoto.url}?f=face&fit=thumb&r=max&w=235&h=235&fm=png`}
            alt=""
            className=""
          />
        </div>
        <div className="font-bold leading-10 w-2/3 text-5xl text-blue-900 px-20 py-40">
          <div className="max-w-xl">
            <h1>
              {firstName}
              <span className="block font-light my-2 text-gray-400">
                {otherNames}
              </span>
            </h1>

            <div className="md:flex my-4 justify-between items-center">
              <h2 className="text-gray-400 text-2xl font-light">
                {data.contentfulHome.profileHeadline}
              </h2>
              <div className="flex md:space-x-1">
                {data.allContentfulExternalProfile.nodes.map(
                  (externalProfile, idx) => (
                    <SocialButton
                      key={`social-button-${idx}`}
                      icon={externalProfile.icon}
                      link={externalProfile.link}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex">
        <div className="bg-gray-200 w-1/3 py-10 md:px-40 text-right">
          <h3 className="text-2xl font-semibold text-blue-900">ABOUT ME</h3>
        </div>
        <div className="bg-gray-100 block w-2/3 px-20 py-10 text-gray-800">
          <article className="max-w-xl space-y-4 text-justify">
            <ContentfulRichTech richText={data.contentfulHome.intro} />
          </article>
        </div>
      </section>
      {/* =================== Experience =================== */}
      <section className="flex">
        <div className="block bg-gray-100 w-1/3 py-10 md:px-40 text-right space-x-50">
          <h3 className="text-2xl font-semibold text-blue-900">EXPERIENCE</h3>
          <div className="text-xl text-gray-300">
            {data.allContentfulKeyAbilities.nodes.map(
              (keyAbilities, abilities, idx) => (
                <>
                  <section className="block text-center font-bold text-xl">
                    {keyAbilities.abilities}
                  </section>
                </>
              )
            )}
          </div>
        </div>
        <div className="bg-gray-200 block w-2/3 px-20 py-10 text-gray-800">
          {data.allContentfulExperience.nodes.map((experience, idx) => (
            <article className="max-w-xl text-justify text-gray-800 first:mt-0 mt-10 last:border-b-0 border-b-2 border-gray-300">
              <h4 className="font-bold text-xl">{experience.title}</h4>
              <span className="block">{experience.companyName}</span>
              <span className="space-x-8 lock text-sm text-gray-600">
                <time dateTime={experience.startDate}>
                  {experience.startDate}
                </time>

                <time dateTime={experience.endDate}>
                  {experience.endDate || "present"}
                </time>
              </span>
              <span className="block text-sm text-gray-600 mb-4">
                {experience.location}
              </span>
              <span>
                <ContentfulRichTech richText={experience.description} />
              </span>
            </article>
          ))}
        </div>
      </section>

      <div>
        <section className="flex">
          <div className="bg-gray-200 w-1/3 py-10 md:px-40 text-right">
            <h5 className="text-2xl font-semibold text-blue-900">SKILLS</h5>
          </div>
          <div className="bg-gray-100 block w-2/3 px-20 py-10 text-gray-800">
            <article className="max-w-xl my-4 space-y-4 text-justify">
              JavaScript
            </article>
            <article className="max-w-xl my-4 space-y-4 text-justify">
              HTML/CSS
            </article>
            <article className="max-w-xl my-4 space-y-4 text-justify">
              React
            </article>
            <article className="max-w-xl my-4 space-y-4 text-justify">
              GitHub
            </article>
            <article className="max-w-xl my-4 space-y-4 text-justify">
              AWS
            </article>
          </div>
        </section>
      </div>

      <div>
        <section className="flex">
          <div className="bg-gray-100 w-1/3 py-10 md:px-40 text-right">
            <h5 className="text-2xl font-semibold text-blue-900">IDIOMS</h5>
          </div>
          <div className="bg-gray-200 block w-2/3 px-20 py-10 text-gray-800">
            <article className="max-w-xl space-y-4 text-justify">
              Portuguese - Native
            </article>
            <article className="max-w-xl space-y-4 text-justify">
              English - Fluent
            </article>
            <article className="max-w-xl space-y-4 text-justify">
              Spanish - Advanced
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export const query = graphql`
  query IndexPageQuery {
    contentfulHome {
      phone
      profileHeadline
      email
      location
      intro {
        raw
      }
      title
      profilePhoto {
        url
      }
    }
    allContentfulExternalProfile {
      nodes {
        icon
        link
      }
    }
    allContentfulExperience(sort: { fields: startDate, order: DESC }) {
      nodes {
        title
        startDate
        endDate
        description {
          raw
        }
        companyName
        location
      }
    }
    allContentfulKeyAbilities {
      nodes {
        keyAbilities
        abilities
      }
    }
  }
`;
export default IndexPage;

export const Head = () => <title>Home Page</title>;
