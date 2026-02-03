$(document).ready(function () {

  $(document).on("click", ".toggle-modal", function () {
    $("#checkpriority").addClass("show active");

    $("body").addClass("modal-open");

    // Add backdrop if not exists
    if (!$(".modal-backdrop").length) {
      $('<div class="modal-backdrop fade show"></div>').appendTo("body");
    }
  });

  $(document).on("click", ".close-modal-btn", function () {
    $("#checkpriority").removeClass("show active");

    $("body").removeClass("modal-open");

    // Remove backdrop if exists
    $(".modal-backdrop").remove();
  });

  // Country code select

  const $countrySelect = $("#countryCode");
  const countries = window.CountryList.getAll();
  const $flagIcon = $("#flag");
  const $dropdown = $("#countryDropdown");

  countries.forEach(country => {
    $dropdown.append(`
      <div class="dropdown-item" data-code="${country.code}" data-dial-code="${country.dial_code}">
        <span class="dropdown-flag">${window.CountryFlagSvg[country.code]}</span>
        <span>${country.name}</span>
        <span>${country.dial_code}</span>
      </div>
    `);
  });

  // Default country
  const defaultCountry = window.CountryList.findOneByCountryCode("US");
  $('#phoneNumberCode').val(defaultCountry.dial_code);
  $flagIcon.html(window.CountryFlagSvg[defaultCountry.code]);

  // Toggle select on flag click
  $(".flag-container").on("click", function (e) {
    e.stopPropagation();
    $dropdown.toggle();
  });

  $(document).on("click", ".dropdown-item", function () {
    const code = $(this).data("code");
    const dialCode = $(this).data("dial-code");

    $("#flag").html(window.CountryFlagSvg[code]);
    $('#phoneNumberCode').val(dialCode);
    $('#phoneNumber').select();
    $dropdown.hide();
  });
  // Close dropdown when clicking outside
  $(document).on("click", function () {
    $dropdown.hide();
  });

  // Form submit

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(this);

     // Get values
    let phoneCode = formData.get("phone_code");
    let number = formData.get("number");
    // Concatenate
    let phone = phoneCode + number;
    // Remove old fields (optional but recommended)
    formData.delete("phone_code");
    formData.delete("number");
    // Add new field
    formData.append("phone", phone);

    let url = "http://test-api.test/api/test-contect";

    if (url) {
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        beforeSend: function () {
          $(".ecc-email-submit-btn").text("Sending...");
        },
        success: function (response) {
          $("#contactForm")[0].reset();

          $("#checkpriority").removeClass("show active");
          $("body").removeClass("modal-open");
          $(".modal-backdrop").remove();
        },
        error: function () {
          alert("Server error. Try again.");
        },
        complete: function () {
          $(".ecc-email-submit-btn").text("Submit");
        },
      });
    }
  });
});
