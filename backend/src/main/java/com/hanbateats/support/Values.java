package com.hanbateats.support;

import java.util.Collection;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Pattern;

/** server.py의 작은 변환·검증 함수들을 같은 규칙으로 옮긴 것. */
public final class Values {

  // Python int("1_000")처럼 숫자 사이 밑줄 하나는 허용한다.
  private static final Pattern PY_INT = Pattern.compile("[+-]?\\d+(_\\d+)*");

  private Values() {
  }

  public static long now() {
    return System.currentTimeMillis() / 1000;
  }

  /** server.py의 to_int: 쉼표 제거 후 정수 변환, 실패하면 기본값. "12.5"처럼 소수면 실패로 본다. */
  public static long toInt(Object value, long defaultValue) {
    if (value == null) {
      return defaultValue;
    }
    String text = pyStrip(String.valueOf(value).replace(",", ""));
    if (!PY_INT.matcher(text).matches()) {
      return defaultValue;
    }
    try {
      return Long.parseLong(text.replace("_", ""));
    } catch (NumberFormatException error) {
      return defaultValue;
    }
  }

  /** server.py의 to_float. 숫자로 바꿀 수 없으면 null. */
  public static Double toFloat(Object value) {
    if (value == null) {
      return null;
    }
    if (value instanceof Number number) {
      return number.doubleValue();
    }
    try {
      return Double.parseDouble(pyStrip(value.toString()));
    } catch (NumberFormatException error) {
      return null;
    }
  }

  /** Python의 bool(value). */
  public static boolean truthy(Object value) {
    if (value == null) {
      return false;
    }
    if (value instanceof Boolean bool) {
      return bool;
    }
    if (value instanceof Number number) {
      return number.doubleValue() != 0;
    }
    if (value instanceof String text) {
      return !text.isEmpty();
    }
    if (value instanceof Collection<?> collection) {
      return !collection.isEmpty();
    }
    if (value instanceof Map<?, ?> map) {
      return !map.isEmpty();
    }
    return true;
  }

  /** Python의 str.strip(): 유니코드 공백(줄바꿈 없는 공백 포함)을 양끝에서 제거한다. */
  public static String pyStrip(String value) {
    int start = 0;
    int end = value.length();
    while (start < end && isPySpace(value.charAt(start))) {
      start++;
    }
    while (end > start && isPySpace(value.charAt(end - 1))) {
      end--;
    }
    return value.substring(start, end);
  }

  private static boolean isPySpace(char ch) {
    return Character.isWhitespace(ch) || Character.isSpaceChar(ch);
  }

  /** Python의 len(str): UTF-16 단위가 아니라 문자(code point) 수를 센다. 이모지 1개 = 1. */
  public static int pyLen(String value) {
    return value.codePointCount(0, value.length());
  }

  /** Python의 format(n, ","): 1234 -> "1,234". */
  public static String comma(long value) {
    return String.format(Locale.ROOT, "%,d", value);
  }

  private static String digitsOnly(String value, int maxLength) {
    StringBuilder digits = new StringBuilder();
    value.codePoints()
      .filter(Character::isDigit)
      .forEach(digits::appendCodePoint);
    return digits.length() > maxLength ? digits.substring(0, maxLength) : digits.toString();
  }

  public static String normalizePhone(String value) {
    return digitsOnly(value, 11);
  }

  public static boolean isValidPhone(String phone) {
    return phone.length() == 11 && phone.startsWith("010");
  }

  public static String normalizeAccountNumber(String value) {
    return digitsOnly(value == null ? "" : value, 20);
  }

  public static String digits(String value, int maxLength) {
    return digitsOnly(value, maxLength);
  }

  public static boolean isValidAccount(String bankName, String accountNumber, String accountHolder) {
    int bankLength = pyLen(bankName);
    int numberLength = pyLen(accountNumber);
    int holderLength = pyLen(accountHolder);
    return 1 <= bankLength && bankLength <= 20
      && 6 <= numberLength && numberLength <= 20
      && 2 <= holderLength && holderLength <= 20;
  }

  public static String maskAccountNumber(String accountNumber) {
    String normalized = normalizeAccountNumber(accountNumber);
    if (normalized.length() <= 4) {
      return normalized;
    }
    return "•••• " + normalized.substring(normalized.length() - 4);
  }

  public static boolean hasPayoutAccount(Row row) {
    String bankName = (String) row.getOptional("payout_bank");
    String accountNumber = (String) row.getOptional("payout_account_number");
    String accountHolder = (String) row.getOptional("payout_account_holder");
    return isValidAccount(
      bankName == null ? "" : bankName,
      normalizeAccountNumber(accountNumber),
      accountHolder == null ? "" : accountHolder
    );
  }
}
