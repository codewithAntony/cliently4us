package utils

import (
	"sync"
	"time"
)

var (
	tokenBlacklist = make(map[string]time.Time)
	blacklistMutex sync.RWMutex
)

func AddToBlacklist(token string, expiry time.Time) {
	blacklistMutex.Lock()
	defer blacklistMutex.Unlock()
	tokenBlacklist[token] = expiry
}

func IsTokenBlacklisted(token string) bool {
	blacklistMutex.RLock()
	defer blacklistMutex.RUnlock()

	if expiry, exists := tokenBlacklist[token]; exists {
		if time.Now().After(expiry) {
			blacklistMutex.Lock()
			delete(tokenBlacklist, token)
			blacklistMutex.Unlock()
			return false
		}
		return true
	}
	return false
}

func CleanExpiredTokens() {
	ticker := time.NewTicker(1 * time.Hour)
	for range ticker.C {
		CleanExpiredBlacklistTokens()
	}
}

func CleanExpiredBlacklistTokens() {
	blacklistMutex.Lock()
	defer blacklistMutex.Unlock()

	now := time.Now()
	for token, expiry := range tokenBlacklist {
		if now.After(expiry) {
			delete(tokenBlacklist, token)
		}
	}
}

func init() {
	go CleanExpiredTokens()
}
