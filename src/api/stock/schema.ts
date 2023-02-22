export const StockGetByPortfolio = {
  querystring: {
    type: "object",
    required: ["portfolioId"],
    properties: {
      portfolioId: { type: "string" },
    },
  },
};

export const StockAdd = {
  body: {
    type: "object",
    required: ["portfolioId", "title", "currentPrice", "history"],
    properties: {
      portfolioId: { type: "string" },
      title: { type: "string" },
      code: { type: "string" },
      currentPrice: { type: "number" },
      history: {
        type: "array",
        items: {
          type: "object",
          required: ["price", "quantity", "date", "action"],
          properties: {
            price: { type: "number" },
            quantity: { type: "number" },
            date: { type: "string" },
            action: { enum: ["BUY", "SELL"] },
          },
        },
      },
    },
  },
};

export const StockUpdate = {
  body: {
    type: "object",
    properties: {
      _id: { type: "string" },
      title: { type: "string" },
      code: { type: "string" },
      currentPrice: { type: "number" },
      history: {
        type: "array",
        items: {
          type: "object",
          required: ["price", "quantity", "date", "action"],
          properties: {
            price: { type: "number" },
            quantity: { type: "number" },
            date: { type: "string" },
            action: { enum: ["BUY", "SELL"] },
          },
        },
      },
    },
  },
};

export const StockDelete = {
  querystring: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
