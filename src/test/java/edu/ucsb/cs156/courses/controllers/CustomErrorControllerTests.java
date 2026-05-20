package edu.ucsb.cs156.courses.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;

import jakarta.servlet.RequestDispatcher;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.ui.ConcurrentModel;
import org.springframework.ui.Model;

public class CustomErrorControllerTests {

  @Test
  public void handleError_setsModelAttributes_for500WithException() {
    CustomErrorController controller = new CustomErrorController();
    MockHttpServletRequest request = new MockHttpServletRequest();
    Model model = new ConcurrentModel();

    RuntimeException exception =
        new RuntimeException("This is a test exception to trigger the custom error page");

    request.setAttribute(RequestDispatcher.ERROR_STATUS_CODE, 500);
    request.setAttribute(RequestDispatcher.ERROR_MESSAGE, "Test message");
    request.setAttribute(RequestDispatcher.ERROR_REQUEST_URI, "/test-error");
    request.setAttribute(RequestDispatcher.ERROR_EXCEPTION, exception);

    String viewName = controller.handleError(request, model);

    assertEquals("custom-error", viewName);
    assertEquals(500, model.getAttribute("status"));
    assertEquals("Internal Server Error", model.getAttribute("error"));
    assertEquals("Test message", model.getAttribute("message"));
    assertEquals("/test-error", model.getAttribute("path"));
    assertEquals(
        "This is a test exception to trigger the custom error page",
        model.getAttribute("exceptionMessage"));
  }

  @Test
  public void handleError_setsDefaults_whenNoAttributes() {
    CustomErrorController controller = new CustomErrorController();
    MockHttpServletRequest request = new MockHttpServletRequest();
    Model model = new ConcurrentModel();

    String viewName = controller.handleError(request, model);

    assertEquals("custom-error", viewName);
    assertEquals(500, model.getAttribute("status"));
    assertEquals("Internal Server Error", model.getAttribute("error"));
    assertEquals("", model.getAttribute("message"));
    assertEquals("", model.getAttribute("path"));
    assertEquals("", model.getAttribute("exceptionMessage"));
    assertEquals("", model.getAttribute("stackTrace"));
  }

  @Test
  public void handleError_setsNotFound_for404() {
    CustomErrorController controller = new CustomErrorController();
    MockHttpServletRequest request = new MockHttpServletRequest();
    Model model = new ConcurrentModel();

    request.setAttribute(RequestDispatcher.ERROR_STATUS_CODE, 404);

    String viewName = controller.handleError(request, model);

    assertEquals("custom-error", viewName);
    assertEquals(404, model.getAttribute("status"));
    assertEquals("Not Found", model.getAttribute("error"));
  }
}
