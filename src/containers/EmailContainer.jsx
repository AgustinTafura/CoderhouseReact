import React from 'react';







const EmailContainer = (props) => {
  function sendEmail(e) {
    // e.preventDefault();
  
    // emailjs.sendForm('thanksforyourpurchase', 'template_2tnfitf', e.target, 'user_d5kbEdnEX8hB4qeX7oMCf')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       console.log(error.text);
    //   });
  }
  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
}

export default EmailContainer
