module.exports = {
    default: {
      require: ["./src/steps/**/*.ts"],
      requireModule: ["ts-node/register"],
      format: ["progress-bar", "json:reports/cucumber_report.json"],
      paths: ["./src/features/**/*.feature"],
      publishQuiet: true
    }
  };
  