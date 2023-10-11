const puppeteer = require("puppeteer");
const path = require("path");

var requestBody;

const loadReport = async (req, res) => {
  try {
    const requestData = requestBody;

    if (!Array.isArray(requestData)) {
      throw new Error("Request data is not in the expected format.");
    }

    const labels = requestData.map((entry) => entry.data_year.toString());
    const data = requestData.map((entry) => entry.Burglary);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Burglary",
          data: data,
          borderColor: "#1463FF",
          fill: false,
        },
      ],
    };
    res.render("report", {
      chartData: JSON.stringify(chartData),
    });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
};

const generateReport = async (req, res) => {
  try {
    requestBody = req.body;
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: puppeteer.executablePath(),
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-web-security",
        "--disable-features=IsolateOrigins",
        "--disable-site-isolation-trials",
        "--disable-features=BlockInsecurePrivateNetworkRequests",
        "--disable-setuid-sandbox",
        "--no-first-run",
        "--no-sandbox",
        "--no-zygote",
        "--disabled-setupid-sandbox",
        "--single-process",
      ],
    });
    console.log(puppeteer.executablePath());
    const page = await browser.newPage();
    await page.goto(
      "https://real-assist-backend-d02ec0b0906c.herokuapp.com/report",
      {
        waitUntil: "networkidle2",
      }
    );

    await page.setViewport({ width: 595, height: 842 });

    const todayDate = new Date();

    const pdfBuffer = await page.pdf({
      path: `${path.join(
        __dirname,
        "../public/files",
        todayDate.getTime() + ".pdf"
      )}`,
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    const pdfFileName = todayDate.getTime() + ".pdf";

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${pdfFileName}"`
    );

    res.send(pdfBuffer);

    // res.download(pdfURL, function (err) {
    //   if (errr) {
    //     console.log(errr);
    //   } else {
    //   }
    // });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loadReport,
  generateReport,
};
