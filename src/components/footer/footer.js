import createElement from "../utils.js";
import rss from '../../assets/svg/rsschool.svg';
import gh from '../../assets/svg/github.svg';

export default {
  async setFooter() {
    const footer = createElement("div", "footer");
    const create = createElement("div", "create");
    create.textContent = "2022";
    const logos = createElement("div", "logos");
    const rsschool = createElement("div", "rsschool");
    const rsschoolLink = createElement("a", "rsschool-link");
    rsschoolLink.href = 'https://rs.school/js/'
    const rsschoolLinkImage = createElement("img", "rsschool-link-image");
    rsschoolLinkImage.src = rss;
    rsschool.append(rsschoolLink);
    rsschoolLink.append(rsschoolLinkImage);

    const github = createElement("div", "github");
    const githubLink = createElement("a", "github-link");
    githubLink.href = 'https://github.com/YuliDemins';
    const githubLinkImage = createElement("img", "github-link-image");
    githubLinkImage.src = gh;
    github.append(githubLink);
    githubLink.append(githubLinkImage);
    logos.append(rsschool, github);
    footer.append(create, logos);
    await root.append(footer);
  }
};
