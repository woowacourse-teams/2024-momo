package kr.momo.config;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.springframework.boot.test.context.TestComponent;

@TestComponent
public class PortKiller {

    private static final String OS_NAME = System.getProperty("os.name").toLowerCase();
    private static final String WIN_PORT_FIND_COMMAND = "netstat -ano | findstr :%d";
    private static final String NOT_WIN_PORT_FIND_COMMAND = "lsof -i :%d";
    private static final String WIN_PROCESS_KILL_COMMAND = "taskkill /PID %s /F";
    private static final String NOT_WIN_PROCESS_KILL_COMMAND = "kill -9 %s";
    private static final boolean IS_OS_WINDOW = OS_NAME.contains("win");

    public void killProcessUsingPort(int port) {
        try {
            String pid = getProcessIdUsingPort(port);
            if (pid != null) {
                killProcess(pid);
            }
        } catch (Exception e) {
            System.err.println("포트 종료 중 오류 발생: " + e.getMessage());
        }
    }

    private String getProcessIdUsingPort(int port) throws Exception {
        String command = getFindPortCommand(port);
        Process process = Runtime.getRuntime().exec(command);
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            if ((line = reader.readLine()) != null) {
                return parseUsingPort(line);
            }
        }
        return null;
    }

    private String parseUsingPort(String line) {
        if (IS_OS_WINDOW) {
            return line.trim().split("\\s+")[4];
        }
        return line.trim().split("\\s+")[1];
    }

    private String getFindPortCommand(int port) {
        if (IS_OS_WINDOW) {
            return WIN_PORT_FIND_COMMAND.formatted(port);
        }
        return NOT_WIN_PORT_FIND_COMMAND.formatted(port);
    }

    private void killProcess(String pid) throws Exception {
        String command = getKillCommand(pid);
        Process process = Runtime.getRuntime().exec(command);
        process.waitFor();
    }

    private String getKillCommand(String pid) {
        if (IS_OS_WINDOW) {
            return WIN_PROCESS_KILL_COMMAND.formatted(pid);
        }
        return NOT_WIN_PROCESS_KILL_COMMAND.formatted(pid);
    }
}
