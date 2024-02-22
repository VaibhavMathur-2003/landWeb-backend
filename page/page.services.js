import Pages from './page.modal';

export const createPage = async (pageBody) => {
  const slug = pageBody.name.toLowerCase().split(' ').join('-');
  pageBody.slug = slug;
  const page = new Pages(pageBody);
  const pageResponse = await page.save();
  return pageResponse;
};
export const listPages = async () => {
  const pages = await Pages.find({});
  return pages;
};
export const deletePage = async (pageId) => {
  try {
    const deletedPage = await Pages.findByIdAndDelete(pageId);
    
    if (!deletedPage) {
      throw new Error('Page not found');
    }
    return deletedPage;
  } catch (error) {
    throw error;
  }
};

export const updatePage = async (pageId, pageBody) => {};
export const pageDetails = async (pageId) => {
  const pages = await Pages.findOne({ _id: pageId });
  return pages;
};
export const savePageContent = async (pageId, content) => {
  const pageUpdated = await Pages.findOneAndUpdate({ _id: pageId }, { content });
  return pageUpdated;
};
export const findPageById = async (pageId) => {
  const page = await Pages.findById(pageId);
  return page;
};
