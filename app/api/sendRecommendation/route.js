import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { to, subject, text } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const recipients = to.split(","); 
    let sendPromises = [];
    let success = true; 

    for (let i = 0; i < recipients.length; i += 2) {
      let toList = recipients.slice(i, i + 2).join(",");  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: toList,  
        subject: subject,
        text: text,
      };

      try {
        sendPromises.push(transporter.sendMail(mailOptions));
      } catch (error) {
        console.error(`Error sending email to ${toList}:`, error);
        success = false;  
      }
    }

    await Promise.all(sendPromises);

    if (success) {
      return new Response(
        JSON.stringify({ message: "Emails sent successfully!" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Some emails failed to send" }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: `Error sending email: ${error.message}` }),
      { status: 500 }
    );
  }
}
