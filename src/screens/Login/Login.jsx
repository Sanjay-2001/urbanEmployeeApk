import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from '../../utils/COLORS';
import {loginStyles} from '../../styles';

const Login = ({handleLogin}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = number => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneChange = text => {
    setPhone(text);
    setError(''); // Clear error when typing
  };

  const handlePasswordChange = text => {
    setPassword(text);
    setError(''); // Clear error when typing
  };

  const onLoginPress = async () => {
    if (!phone && !password) {
      setError('Please enter both phone and password');
      return;
    }

    if (!phone) {
      setError('Please enter phone number');
      return;
    }
    if (!password) {
      setError('Please enter password');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    try {
      await handleLogin('dummy-auth-token');
    } catch (e) {
      console.error('Login failed', e);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={loginStyles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <ScrollView
        contentContainerStyle={loginStyles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={loginStyles.loginContainer}>
          <Image
            source={require('../../assets/images/app_logo.png')}
            style={loginStyles.loginImage}
          />
          <Text style={loginStyles.loginTitle}>SearchIn</Text>
          <Text style={loginStyles.loginSubTitle}>Welcome Back!</Text>
          <Text style={loginStyles.loginText}>
            Please enter your Phone & Password to sign in.
          </Text>

          <View style={loginStyles.loginForm}>
            {/* Phone Input */}
            <View style={loginStyles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.text.placeholder}
                style={loginStyles.inputIcon}
              />
              <TextInput
                style={loginStyles.input}
                placeholder="Phone Number"
                placeholderTextColor={COLORS.text.placeholder}
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>

            {/* Password Input */}
            <View style={loginStyles.inputContainer}>
              <Ionicons
                name={
                  showPassword ? 'lock-open-outline' : 'lock-closed-outline'
                }
                size={20}
                color={COLORS.text.placeholder}
                style={loginStyles.inputIcon}
              />
              <TextInput
                style={loginStyles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.text.placeholder}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={loginStyles.eyeIcon}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.text.placeholder}
                />
              </TouchableOpacity>
            </View>

            {error ? <Text style={loginStyles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={loginStyles.button} onPress={onLoginPress}>
              <Text style={loginStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
