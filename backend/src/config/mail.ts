interface InterfaceEmailConfig {
  driver: "ethereal" | "ses";

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",

  defaults: {
    from: {
      email: "contato@lfoliveira.technology",
      name: "GoBarber",
    },
  },
} as InterfaceEmailConfig;
