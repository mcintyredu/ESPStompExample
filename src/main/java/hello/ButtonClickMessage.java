package hello;

public class ButtonClickMessage {
	
	private int button;
	
	public ButtonClickMessage() {}
	
	public ButtonClickMessage(int b) {
		button = b;
	}

	public int getButton() {
		return button;
	}

	public void setButton(int button) {
		this.button = button;
	}
}
