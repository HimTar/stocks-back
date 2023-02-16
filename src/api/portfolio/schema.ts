export const PortfolioGet = {
  querystring: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};

export const PortfolioAdd = {
  body: {
    type: "object",
    required: ["title", "description"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
    },
  },
};

export const PortfolioDelete = {
  querystring: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
